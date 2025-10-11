# 🚀 Vercel Setup - Quick Fix Guide

## ⚠️ **Important: Configure Root Directory**

Vercel needs to know that your frontend is in the `frontend/` folder.

---

## 📋 **Step-by-Step Configuration**

### **1. Go to Vercel Dashboard**
- Visit: https://vercel.com/dashboard
- Click on your project: **RafayMernStack-Task**

### **2. Configure Root Directory**
1. Click **"Settings"** (top menu)
2. Go to **"General"** tab (left sidebar)
3. Scroll to **"Root Directory"** section
4. Click **"Edit"**
5. Enter: `frontend`
6. Click **"Save"**

### **3. Configure Build Settings**
In the same Settings → General page:

**Build & Development Settings:**
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### **4. Add Environment Variable**
1. Go to **"Settings"** → **"Environment Variables"**
2. Click **"Add New"**
3. Enter:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.railway.app/api`
   - ⚠️ Replace with your actual Railway backend URL
4. Click **"Save"**

### **5. Redeploy**
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

---

## ✅ **Expected Result**

After configuration, Vercel will:
1. Use `frontend` as the root directory
2. Install dependencies from `frontend/package.json`
3. Build using Vite
4. Deploy the `dist` folder
5. Your app will be live! 🎉

---

## 🔗 **Get Your Backend URL**

### **Railway Backend:**
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your backend project
3. Go to **"Settings"** → **"Domains"**
4. Copy the generated domain (e.g., `https://your-app.up.railway.app`)
5. Add `/api` to the end: `https://your-app.up.railway.app/api`
6. Use this as `VITE_API_URL` in Vercel

---

## 📊 **Project Structure**

```
RafayMernStack-Task/
├── frontend/          ← Vercel deploys THIS folder
│   ├── src/
│   ├── package.json
│   └── dist/         ← Build output
├── backend/          ← Deployed separately on Railway
├── vercel.json       ← Routing configuration
└── .vercelignore     ← Ignores backend folder
```

---

## 🧪 **Test Your Deployment**

1. **Visit your Vercel URL:** `https://rafay-mernstack-task.vercel.app`
2. **Register a new account**
3. **Login**
4. **Create/Edit/Delete notes**
5. **Test search functionality**

---

## 🚨 **Common Issues**

### **Issue: "Cannot read package.json"**
**Solution:** Make sure Root Directory is set to `frontend` in Vercel settings.

### **Issue: "404 on page refresh"**
**Solution:** Already handled by `vercel.json` rewrites configuration.

### **Issue: "API calls failing"**
**Solution:** 
1. Check that `VITE_API_URL` is set correctly in Vercel
2. Verify backend is running on Railway
3. Check browser console for CORS errors

---

## ✅ **Final Checklist**

- [ ] Root Directory set to `frontend` in Vercel settings
- [ ] Build settings configured (Vite preset)
- [ ] `VITE_API_URL` environment variable added
- [ ] Backend is deployed and running on Railway
- [ ] Redeployed after configuration
- [ ] Tested login/register
- [ ] Tested CRUD operations

---

## 🎉 **Success!**

Your MERN stack application should now be deployed successfully on Vercel!

**Frontend URL:** `https://rafay-mernstack-task.vercel.app` (or your custom domain)  
**Backend URL:** Your Railway URL  
**Database:** MongoDB Atlas

---

## 📞 **Need Help?**

Check the deployment logs:
- **Vercel:** Dashboard → Deployments → Click deployment → View logs
- **Railway:** Dashboard → Deployments → View logs

