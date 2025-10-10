# 🚀 Vercel Deployment Guide - Fixed Configuration

## ✅ Problem Solved!

The issue was that Vercel couldn't find `package.json` at the root of the repository because this is a monorepo structure.

**Files Added:**
- ✅ `/package.json` - Root package file for Vercel
- ✅ `/vercel.json` - Vercel configuration file

---

## 📋 Step-by-Step Deployment on Vercel

### **Step 1: Push Changes to GitHub**

```bash
git add .
git commit -m "Add Vercel configuration files"
git push origin main
```

### **Step 2: Deploy on Vercel Dashboard**

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "Add New" → "Project"**
4. **Import your repository:** `abdulraffayy/RafayMernStack-Task`
5. **Configure Build Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** Leave as `.` (root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install`

6. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add: `VITE_API_URL`
   - Value: `https://your-backend-url.railway.app/api`
   - ⚠️ **Replace with your actual Railway backend URL**

7. **Click "Deploy"**

---

## 🔧 Configuration Files Explained

### **`/package.json`**
```json
{
  "name": "rafay-mernstack-task",
  "scripts": {
    "install": "cd frontend && npm install",
    "build": "cd frontend && npm run build",
    "start": "cd frontend && npm run preview"
  }
}
```
- Tells Vercel where to find and build the frontend

### **`/vercel.json`**
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
- Configures Vercel to build from the `frontend` folder
- Sets up SPA routing (all routes go to index.html)
- Optimizes caching for assets

---

## 🔗 Get Your Backend URL

### **If deployed on Railway:**

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Select your backend project
3. Go to "Settings" tab
4. Find "Domains" section
5. Copy the generated URL (e.g., `https://your-app.up.railway.app`)
6. Your API URL will be: `https://your-app.up.railway.app/api`

### **Set it in Vercel:**

1. Go to your Vercel project
2. Click "Settings" → "Environment Variables"
3. Add `VITE_API_URL` = `https://your-backend-url.railway.app/api`
4. Click "Save"
5. Redeploy (Settings → Deployments → Click "..." → Redeploy)

---

## 🧪 Test Your Deployment

### **1. Test Backend (in browser or curl):**
```bash
curl https://your-backend-url.railway.app/api/users/test
```

### **2. Test Frontend:**
1. Open your Vercel deployment URL
2. Try to register a new account
3. Login with the account
4. Create, edit, and delete notes
5. Test search functionality

---

## 🚨 Common Issues & Solutions

### **Issue: "Module not found" errors**
**Solution:** Make sure all dependencies are installed in the frontend folder
```bash
cd frontend
npm install
```

### **Issue: "API calls failing" or "Network Error"**
**Solution:** 
1. Check that `VITE_API_URL` is set correctly in Vercel
2. Make sure your backend is running on Railway
3. Verify backend CORS settings allow your Vercel domain

### **Issue: "404 on refresh"**
**Solution:** The `vercel.json` rewrites configuration handles this. Make sure the file is committed.

### **Issue: "Build fails"**
**Solution:** 
1. Check that `frontend/package.json` has the correct build script
2. Verify TypeScript compilation passes locally: `cd frontend && npm run build`
3. Check Vercel build logs for specific errors

---

## 📊 Expected URLs

After successful deployment:

```
Frontend (Vercel):  https://rafay-mernstack-task.vercel.app
Backend (Railway):  https://your-backend-name.up.railway.app
Database:           MongoDB Atlas
```

---

## ✅ Deployment Checklist

- [x] Created `/package.json` at root
- [x] Created `/vercel.json` configuration
- [ ] Pushed changes to GitHub
- [ ] Backend deployed on Railway
- [ ] Got backend URL
- [ ] Set `VITE_API_URL` in Vercel
- [ ] Deployed frontend on Vercel
- [ ] Tested login/register
- [ ] Tested CRUD operations

---

## 🎉 Success!

Your MERN stack application should now be live on Vercel! 

If you face any issues, check the Vercel deployment logs or Railway logs for detailed error messages.

**Need help?** Check the error logs in:
- Vercel Dashboard → Your Project → Deployments → Click on deployment → View Function Logs
- Railway Dashboard → Your Project → Deployments → View Logs

