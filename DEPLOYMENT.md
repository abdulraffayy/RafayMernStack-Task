# 🚀 Deployment Guide

## 📋 **Deployment Strategy**

### **Frontend → Vercel** ✅
### **Backend → Railway/Render** ✅

---

## 🎯 **Step 1: Deploy Backend**

### **Option A: Railway (Recommended)**

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Select `backend` folder only**
7. **Add Environment Variables:**
   ```
   PORT=7000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   JWT_EXPIRE=7d
   ```
8. **Deploy** - Railway will automatically build and deploy

### **Option B: Render**

1. **Go to [Render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repo**
5. **Configure:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. **Add Environment Variables** (same as Railway)
7. **Deploy**

---

## 🎯 **Step 2: Deploy Frontend to Vercel**

### **Method 1: Vercel Dashboard**

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure:**
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
7. **Deploy**

### **Method 2: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Go to frontend directory
cd frontend

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL
# Enter: https://your-backend-url.com/api
```

---

## 🔧 **Environment Variables Setup**

### **Backend (.env)**
```env
PORT=7000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d
```

### **Frontend (.env.local)**
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 📝 **MongoDB Atlas Setup**

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create a free account**
3. **Create a new cluster**
4. **Create a database user**
5. **Whitelist IP addresses (0.0.0.0/0 for all IPs)**
6. **Get connection string**
7. **Replace `<password>` with actual password**

---

## 🔄 **Update Process**

### **After Backend Deployment:**

1. **Get your backend URL** (e.g., `https://notes-app-backend.railway.app`)
2. **Update frontend environment variable:**
   ```env
   VITE_API_URL=https://notes-app-backend.railway.app/api
   ```
3. **Redeploy frontend**

---

## 🧪 **Testing Deployment**

### **Test Backend:**
```bash
curl https://your-backend-url.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### **Test Frontend:**
1. **Open deployed frontend URL**
2. **Try to register/login**
3. **Create/edit/delete notes**
4. **Test search functionality**

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: CORS Error**
**Solution:** Backend mein CORS properly configured hai, but agar issue ho to:

```javascript
// backend/src/server.ts
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

### **Issue 2: Environment Variables Not Working**
**Solution:** 
- Check variable names (case-sensitive)
- Restart deployment after adding variables
- Use `console.log(process.env)` to debug

### **Issue 3: Build Fails**
**Solution:**
- Check `package.json` scripts
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Check for TypeScript errors

---

## 📊 **Deployment URLs Example**

```
Backend:  https://notes-app-backend.railway.app
Frontend: https://notes-app-frontend.vercel.app
```

---

## ✅ **Final Checklist**

- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully  
- [ ] Environment variables set correctly
- [ ] MongoDB Atlas connected
- [ ] CORS configured properly
- [ ] Authentication working
- [ ] CRUD operations working
- [ ] Search functionality working

---

## 🎉 **Congratulations!**

Your MERN stack Notes application is now live on the internet! 🚀

**Frontend:** Vercel  
**Backend:** Railway/Render  
**Database:** MongoDB Atlas
