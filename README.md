# 🧠 Sehat – Your Friendly Digital Health Buddy 🩺

> “Sehat hai toh sab kuch hai!”  
> A full-stack AI-powered healthcare app built with ❤️ using the MERN stack.

Sehat helps users book appointments, manage health records, talk to AI, and even get Telegram reminders for their meds. It’s like having a doctor, pharmacist, therapist, and assistant — all in one tab!

---

## 🛠 Tech Stack

- 🖥️ **Frontend:** React + Tailwind CSS
- 📦 **State Management:** Zustand
- 🧠 **Backend:** Express + Node.js
- 💾 **Database:** MongoDB
- 🔐 **Authentication:** JWT
- ☁️ **File Uploads:** Cloudinary
- 🧠 **AI:** Gemini API (symptom analysis + AI therapist)
- 📲 **Bot Integration:** Telegram
- 🔐 **Vault:** Pinata IPFS + AES Encryption

---

## ✨ Features

### 👥 Multirole Signup
- Sign up as a **👨‍⚕️ Doctor** or **🧑‍💼 Patient**
- Role-based features and dashboards — no awkward mix-ups!

### 📅 Book Appointments
- Choose doctors **manually** _or_ let AI suggest based on your symptoms 🧠
- View available slots & book in one click
- Doctors can **accept**, **reject**, or **mark appointments complete**

### 📎 Upload Files During Booking
- Patients can attach reports, images, and more while booking
- Doctors get immediate context = faster diagnosis
- Stored securely using **Cloudinary**

### 🤒 AI Symptom Checker
- Enter your symptoms (e.g., “stomach ache + fatigue”)
- Gemini API suggests a specialization (e.g., Gastroenterologist)
- Perfect for people who Google everything anyway 😅

### 🔐 Sehat Vault (Blockchain Storage)
- A private encrypted vault to store health documents (lab reports, prescriptions, etc.)
- Files are **encrypted with a password before upload**
- Stored on **Pinata (IPFS)** — blockchain-style storage
- Only decryptable with your own password 🔓

### 🧭 Nearby Therapist Finder (Google Maps)
- Instantly locate verified therapists near you using **Google Maps integration**
- View profiles, directions, and contact details — all within the app

### 🤖 AI Agentic Telegram Bot  
- Creates **personalized healthcare plans** based on your data  
- Adaptable to your changing health goals  
- Answers **general wellness queries** instantly
---

## 🔐 Authentication
- Uses **JWT tokens** for protected routes and login sessions
- Doctors and patients have separate permissions

---

# SnapShots
![Image 1](https://drive.google.com/uc?export=view&id=1YGdRsG1Qrzfu62mBZZznOLayts8ii_mT)
![Image 2](https://drive.google.com/uc?export=view&id=1YMKxPq6pBPX6coust6qsOeho63KRAeJv)
![Image 3](https://drive.google.com/uc?export=view&id=1SFXq5eThk6dA1Mob_APIP8cYIbdwq-q8)
![Image 4](https://drive.google.com/uc?export=view&id=1H3Fc3BHiC0-rO5DWzwoaH1WJFxa4AU-z)
![Image 5](https://drive.google.com/uc?export=view&id=1gBNbLW-zPT8mTA3oT02u2N1kyOnD99Wo)
![Image 6](https://drive.google.com/uc?export=view&id=1FKsjgKzkwgdy2_lyvrTIzmqQxW1gWYLc)
![Image 7](https://drive.google.com/uc?export=view&id=1b_HmplaparjdNhY22dTrqcCiQeUAQfwh)
![Image 8](https://drive.google.com/uc?export=view&id=1kPAcQYNktA2Gq051icMeALyW4xd6Tm2B)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- API keys for Gemini, Cloudinary, Pinata, and Telegram Bot
- Git

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/sehat.git
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create `.env` files:
   - In `backend/`, add:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     CLOUDINARY_URL=your_cloudinary_url
     PINATA_API_KEY=your_pinata_api_key
     ```
   - In `frontend/`, add:
     ```
      VITE_GOOGLE_MAPS_API_KEY
     ```
5. Run the backend:
   ```bash
   cd backend
   npm run dev
   ```
6. Run the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📂 Folder Structure
```
sehat/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/         # API routes
│   ├── controllers/    # Route handlers
│   └── utils/          # Telegram bot & utilities
├── frontend/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── store/          # Zustand state management
│   └── assets/         # Static files (images, etc.)
```

---

---

## 🧑‍💻 Author
**Mahi Singh**  
🎓 Pre-final year @ Visvesvaraya Technological University  

---

## 🤝 Contributions
Pull requests are welcome — just like healthy habits!  
If you’d like to add a feature, open an issue first to discuss it.

---

## 🧘‍♂️ Fun Fact
This app reminds you to take care of your health — so you don’t need to remember it yourself.  
Let your brain rest. Let Sehat do the reminding 😌
