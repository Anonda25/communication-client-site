# Communication Features in the Forum Project short description

---

## **Features Overview**

### **For Users:**
- View all comments on a specific post in tabular form.
- Provide feedback using a dropdown menu with predefined options:
  - **Offensive content**
  - **Irrelevant comment**
  - **Spam**
- Report comments based on feedback:
  - **Report button** is disabled by default.
  - Selecting feedback enables the *Report button*.
  - Once clicked, the *Report button* is disabled to prevent duplicate reports.
- View full comment text in a modal by clicking the *Read More* link if the comment exceeds 20 characters.

### **For Admin:**
- Access all reports submitted by users.
- View details of each report:
  - **Comment text**
  - **Email of the commenter**
  - **User feedback**
- Take actions against reported comments:
  - **Delete** the comment.



---

## **User Instructions**

### **Comment Page:**
1. Navigate to the comments page by clicking the **Comment button** on a post.
2. View comments in a table with the following columns:
   - **Email:** Displays the email of the commenter.
   - **Comment:** Shows up to 20 characters of the comment. If the text exceeds this limit, a **Read More** link is provided to view the full text in a modal.
   - **Feedback:** A dropdown menu with three predefined options.
   - **Report Button:** Disabled by default.
3. Select a feedback option to enable the **Report button**.
4. Click the **Report button** to submit your report. The button will be disabled after submission.

### **Admin Dashboard:**
1. Access the admin dashboard to view all reports.
2. Reports are displayed in a table with details:
   - **Comment text**
   - **Commenter email**
   - **Feedback type**
   - **Report timestamp**

---

### **Pages Developed**
**Home Page:**Overview of posts and user activity.
**My Profile Page:** Displays user details, badges, and recent posts.
**Join Us Page:**Login and registration forms.
**Membership Page:** Payment page for becoming a member.
**Comments Page:**Shows comments with report and feedback options.
**Admin Profile Page:**Analytics and tag management.

---

### **Frontend Implementation:**
**React :**  For building the dynamic user interface.
**React Router:**   To handle client-side routing and implement private routes.
**Tailwind CSS:**For styling the application and ensuring responsive design.
**DaisyUI:**  For pre-designed components and utility classes.
**React Toastify:**For displaying notifications
**React Hook Form:**  For managing forms and validation.
**TanStack Query:**   For data fetching, caching, and server-state management.
**Axios:**For API requests.



### **Backend **
- **Node.js:**
  -For the backend runtime environment.
- **Express.js:**
  - To create APIs and manage the server-side logic.
- **MongoDB:** For the database to store user data, posts, and comments.
- **JWT (JSON Web Token):**  For authentication and securing private routes.
---

## **UI/UX Design**

### **Comment Page (User View):**
- **Table Layout:**
  - Columns: Email, Comment, Feedback, Report Button.
  - **Read More** link in the comment column for long text.
- **Interaction:**
  - Dropdown enables the report button.
  - Modal displays full comment text.

### **Admin Dashboard:**
- **Table Layout:**
  - Columns: Comment, Email, Feedback, Report Time, Action.
  - Action column includes buttons for delete, warn, and ban.
- **Filter Options:**
  - Filter reports by feedback type or user email.

---


## **Additional Tools**

- **Firebase Authentication:**
  -  For user authentication (email/password and social logins).
 
- **Environment Variables:**
  -  To secure sensitive data like Firebase config keys and MongoDB credentials.
- **Recharts:**
  - For displaying analytics (e.g., pie charts in admin profile).

---


## **How to Run Locallys**
- Clone the repository.
- Install dependencies for both client and server using npm install.
- Set up environment variables for Firebase and MongoDB.
- Run the client with npm start and the server with npm run server.

---


## **dependencies**
**"@stripe/react-stripe-js": "^3.1.1"**,
    **"@stripe/stripe-js": "^5.5.0"**,
    **"@tanstack/react-query": "^5.64.1"**,
    **"axios": "^1.7.9"**,
    **"chart.js": "^4.4.7"**,
    **"date-fns": "^4.1.0"**,
    **"firebase": "^11.1.0"**,
    **"localforage": "^1.10.0"**,
    **"match-sorter": "^8.0.0"**,
    **"react": "^18.3.1"**,
    **"react-dom": "^18.3.1"**,
    **"react-helmet": "^6.1.0"**,
    **"react-helmet-async": "^2.0.5"**,
    **"react-hook-form": "^7.54.2"**,
    **"react-hot-toast": "^2.5.1"**,
    **"react-icons": "^5.4.0"**,
    **"react-is": "^19.0.0"**,
    **"react-minimal-pie-chart": "^9.1.0"**,
    **"react-router-dom": "^7.1.1"**,
    **"react-select": "^5.9.0"**,
    **"react-share": "^5.1.2"**,
    **"recharts": "^2.15.0"**,
    **"sort-by": "^1.2.0"**

## **Live Link**
- https://communication-01.netlify.app/

---


