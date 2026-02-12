## AI Tools Used

| Tool               | Purpose / Tasks                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ChatGPT**        | Problem solving, designing full-stack interconnections, step-by-step guidance for backend/frontend integration, API flow planning, and debugging logic. |
| **GitHub Copilot** | Auto-completion, error handling, snippet suggestions, JSX components, Tailwind styling suggestions.                                                     |

---

## Examples of AI Assistance

1. **Authentication Process**

   * **Problem:** Proper registration mechanism with JWT authentication, password hashing, and protected routes.
   * **Prompt:** Asked for step-by-step JWT authentication, user registration flow, and middleware integration.
   * **Solution Provided:** ChatGPT suggested JWT token generation, middleware for protected routes, bcrypt password hashing, and sequential DB connections.
   * **What I Learned / Modified:** Learned middleware roles, request handling mechanism, and secure JWT verification.

2. **Bulk Operations Performance**

   * **Problem:** Handling multiple tasks at once (bulk update/delete) efficiently using arrays of task IDs.
   * **Prompt:** Explained task structure and asked for optimal bulk operation approach.
   * **Solution Provided:** AI suggested array-based selection, backend endpoints for bulk updates, and front-end integration with checkboxes.
   * **What I Learned / Modified:** Implemented efficient bulk operations and learned how to manage multiple task requests simultaneously.

3. **Statistics Management API**

   * **Problem:** Centralized state management for task statistics (total, completed, pending, overdue).
   * **Prompt:** Asked for state management solutions to reflect real-time statistics on dashboard.
   * **Solution Provided:** AI suggested using Context API to manage central state and re-render stats dynamically.
   * **What I Learned / Modified:** Implemented Context API for global state, dynamic stats updates, and learned efficient React state propagation.

4. **Strong Form Validation**

   * **Problem:** Enforcing secure credentials and task validation (email validation, weak passwords).
   * **Prompt:** Asked for strong validation rules using regex for email, password, and task input.
   * **Solution Provided:** AI provided regex patterns and validation logic for backend and frontend.
   * **What I Learned / Modified:** Implemented strong input validation, regex structure, and secured API endpoints.

5. **Various Filter Options**

   * **Problem:** Real-time filtering on task cards using multiple criteria (status, priority, search, date).
   * **Prompt:** Shared task structure and asked how to link frontend filters with backend API efficiently.
   * **Solution Provided:** AI suggested filter design, query param handling, and live updates.
   * **What I Learned / Modified:** Connected filters with API requests, implemented state-driven real-time updates, and enhanced UX.

---

## Learning Moments

* Centralized **stats management** using Context API
* Efficient **bulk operations handling**
* Implementing **complex filters** on frontend linked with backend
* Tracking dates and sending **overdue notifications**
* Learned to **debug AI suggestions** and manually adjust for coherence

---

## AI Limits

* Some **frontend API integration** required manual adjustment
* **Design frustration** occurred when AI gave basic or generic styling
* AI suggestions needed **final review and customization** for professional-grade UI

---

## Development Speed Improvements

* AI provided **step-by-step solutions instantly**, saving hours of trial and error.
* Reduced debugging time for **common React/Mongoose issues**.
* Enabled faster implementation of **modals, bulk operations, and statistics logic**.

---

## Code Generated vs. Code Written

| Portion                         | Responsibility                                                                                             |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **AI-Generated (70%)**      | Route fixes, modal JSX, dashboard component snippets, Tailwind styling suggestions, bulk operations logic. |
| **Own Code / Manual (30%)** | Context API setup, API integration, testing, debugging, final project wiring, UI polishing.                |

**Why manual:** Ensured project coherence, error-free flow, and professional assessment readiness.

* Styling suggestions by AI were often **basic**, with manual intervention to align with design standards.
* API integration required **careful manual variable management** and modal behavior testing.

