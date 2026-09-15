import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/projects', async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const { name, description, ownerId } = req.body;
  const project = await prisma.project.create({
    data: { name, description, ownerId },
  });
  res.json(project);
});

app.get('/api/projects/:projectId/tasks', async (req, res) => {
  const { projectId } = req.params;
  const tasks = await prisma.task.findMany({ where: { projectId } });
  res.json(tasks);
});

app.post('/api/projects/:projectId/tasks', async (req, res) => {
  const { projectId } = req.params;
  const { title, description, status, assigneeId } = req.body;
  const task = await prisma.task.create({
    data: { title, description, status, projectId, assigneeId },
  });
  io.to(`project_${projectId}`).emit('task_added', task);
  res.json(task);
});

app.put('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status, title, description } = req.body;
  const task = await prisma.task.update({
    where: { id: taskId },
    data: { status, title, description },
  });
  io.to(`project_${task.projectId}`).emit('task_updated', task);
  res.json(task);
});

// Socket.io integration
let activeUsers = 0;

io.on('connection', async (socket) => {
  console.log('User connected:', socket.id);
  activeUsers++;

  // Increment daily visitor count
  const today = new Date().toISOString().split('T')[0];
  try {
    const dailyVisitor = await prisma.dailyVisitor.upsert({
      where: { date: today },
      update: { count: { increment: 1 } },
      create: { date: today, count: 1 },
    });
    
    // Broadcast live stats to all connected clients
    io.emit('visitor_update', {
      activeUsers,
      todayVisits: dailyVisitor.count
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }

  socket.on('join_project', (projectId) => {
    socket.join(`project_${projectId}`);
    console.log(`User ${socket.id} joined project ${projectId}`);
  });

  socket.on('task_updated', (data) => {
    socket.to(`project_${data.projectId}`).emit('task_updated', data);
  });

  socket.on('disconnect', async () => {
    console.log('User disconnected:', socket.id);
    activeUsers = Math.max(0, activeUsers - 1); // Prevent negative
    
    // Get latest daily count to broadcast along with updated active users
    try {
      const today = new Date().toISOString().split('T')[0];
      const dailyVisitor = await prisma.dailyVisitor.findUnique({
        where: { date: today }
      });
      io.emit('visitor_update', {
        activeUsers,
        todayVisits: dailyVisitor?.count || 0
      });
    } catch (error) {
      console.error('Error fetching visitor count on disconnect:', error);
    }
  });
});

// Serve frontend in production
import path from 'path';

const FRONTEND_BUILD_PATH = path.join(__dirname, '../../frontend/dist');
app.use(express.static(FRONTEND_BUILD_PATH));

app.get('{*path}', (req, res) => {
  res.sendFile(path.join(FRONTEND_BUILD_PATH, 'index.html'));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
