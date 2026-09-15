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
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_project', (projectId) => {
    socket.join(`project_${projectId}`);
    console.log(`User ${socket.id} joined project ${projectId}`);
  });

  socket.on('task_updated', (data) => {
    socket.to(`project_${data.projectId}`).emit('task_updated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
