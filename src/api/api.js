import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class QuizzlyApi {

    // the token for interacting with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${QuizzlyApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * USER ROUTES
     */

    /** Create a new user via registration/signup. */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Get details of a user by username. */

    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Update user profile from data */

    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * QUIZ ROUTES
     */

    /** Create a new quiz */

    static async createQuiz(data) {
        let res = await this.request("quizzes", data, "post");
        return res.quiz;
    }

    /** Get quizzes (with optional filters) */

    static async getQuizzes(filters) {
        console.log(">>>", filters);
        let res = await this.request("quizzes", filters);
        return res.quizzes;
    }

    /** Get details of a quiz by id. */

    static async getQuiz(id) {
        let res = await this.request(`quizzes/${id}`);
        return res.quiz;
    }

    /** Update quiz from data */

    static async updateQuiz(id, data) {
        let res = await this.request(`quizzes/${id}`, data, "patch");
        return res.quiz;
    }

    /** Delete a quiz */

    static async deleteQuiz(id) {
        let res = await this.request(`quizzes/${id}`, {}, "delete");

    }

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * QUESTION ROUTES
     */

    /** Create new question */

    static async createQuestion(data) {
        let res = await this.request("questions", data, "post");
        return res.question;
    }

    /** Update question from data */

    static async updateQuestion(id, data) {
        let res = await this.request(`questions/${id}`, data, "patch");
        return res.question;
    }

    /** Delete a question */

    static async deleteQuestion(id) {
        let res = await this.request(`questions/${id}`, {}, "delete");

    }

    //   /** Get list of jobs (filtered by title if not undefined) */

    //   static async getJobs(title) {
    //     let res = await this.request("jobs", { title });
    //     return res.jobs;
    //   }

    //   /** Apply to a job */

    //   static async applyToJob(username, id) {
    //     await this.request(`users/${username}/jobs/${id}`, {}, "post");
    //   }



}

export default QuizzlyApi;