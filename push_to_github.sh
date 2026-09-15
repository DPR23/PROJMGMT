#!/bin/bash

echo "We need a GitHub Personal Access Token (PAT) to push the code."
echo "1. Go to https://github.com/settings/tokens?type=beta"
echo "2. Click 'Generate new token'"
echo "3. Give it a name, select the 'PROJMGMT' repository, and grant 'Contents: Read and write' permission."
echo "4. Copy the generated token."
echo ""
echo "Please paste your GitHub Personal Access Token here (it will be hidden):"
read -s TOKEN

echo ""
echo "Pushing to GitHub..."
git remote set-url origin https://${TOKEN}@github.com/DPR23/PROJMGMT.git
git push -u origin main

# Clean up remote URL so token isn't saved in git config
git remote set-url origin https://github.com/DPR23/PROJMGMT.git
echo "Done! The code has been successfully pushed to your repository."
