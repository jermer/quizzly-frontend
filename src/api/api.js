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

    /** Get the current user. */

    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get quizzes (with optional filters) */

    static async getQuizzes(filters) {
        let res = await this.request("quizzes", filters);
        return res.quizzes;
    }

    /** Get details of a quiz by id. */

    static async getQuiz(id) {
        let res = await this.request(`quizzes/${id}`);
        return res.quiz;
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

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    //   /** Signup for site. */

    //   static async signup(data) {
    //     let res = await this.request(`auth/register`, data, "post");
    //     return res.token;
    //   }

    //   /** Save user profile page. */

    //   static async saveProfile(username, data) {
    //     let res = await this.request(`users/${username}`, data, "patch");
    //     return res.user;
    //   }

}

export default QuizzlyApi;