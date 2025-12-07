## 🔑 Default Login Credentials

Use the following credentials to test the different roles:

| **Role** | **Username / ID** | **Password** | **Access Level** |
| --- | --- | --- | --- |
| **Admin** | `admin` | `admin123` | Full Control |
| **Staff** | `staff` | `staff123` | Add/Update Only |
| **Student** | _(Enter Roll No)_ | `1234` | View Profile Only |

> **Note:** To log in as a student, you must first add a student via the Admin or Staff account. Use that student's **Roll Number** as the username and `1234` as the default password.

---

## 🚀 How to Run

Download or Clone the repository.

Ensure you have an internet connection (for loading FontAwesome icons).

Open `index.html` in any modern web browser (Chrome, Firefox, Edge).

Login using the credentials provided above.

---

## 📸 Usage Guide

### 1\. Admin Workflow

Log in as Admin.

Check the **Dashboard** for branch statistics.

Navigate to **Manage Students** to Add or Edit records.

Click the **Edit (✏️)** button to update details (form turns Orange).

Click the **Trash (🗑️)** button to delete a student.

Use the top-right button to **"Back to Login Page"**.

### 2\. Staff Workflow

Log in as Staff.

You are directed immediately to the management table.

Use the form to **Add** a student or the **Edit (✏️)** button to update existing info.

Use the top-right button to **"Back to Login Page"**.

### 3\. Student Workflow

Log in using your **Roll Number**.

View your marks and grade.

Use the text area to submit a complaint.

Use the **Logout** button at the bottom of the profile section.

---

## ⚠️ Important Note on Data

This application uses **Browser LocalStorage**.

The data is stored **only on your specific browser/device**.

If you clear your browser cache/history, the student data will be wiped.

To clear all data manually, click the red **"⚠️ Reset All Data"** button at the top left of the screen.