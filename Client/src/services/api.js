import { toast } from 'react-hot-toast'

const ENDPOINT = "http://localhost:5205/";

export const signupUser = async(email, password, firstName, lastName) => {
    try {
        const response = await fetch(`${ENDPOINT}api/auth/register`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Check if error message exists and is a string
            const errorMessage = typeof data.error === 'string' ? data.error : 'An error occurred';
            toast.error(errorMessage);
            return { error: errorMessage };
        }

        return data;
    } catch (error) {
        console.error("There was an error", error);
        toast.error("An error occurred while registering.");
        throw error;
    }
}

export const loginUser = async(email, password) => {
    try {
        const response = await fetch(`${ENDPOINT}api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });        

        const data = await response.json();

        if (!response.ok) {
            // Check if error message exists and is a string
            const errorMessage = typeof data.error === 'string' ? data.error : 'An error occurred';
            toast.error(errorMessage);
            return { error: errorMessage };
        }

        return data;
        
    } catch (error) {
        console.error("There was an error", error);
        toast.error("An error occurred while registering.");
        throw error;     
    }
}

export const getUser = async (id) => {
    try {
      const response = await fetch(`${ENDPOINT}api/auth/user?id=${id}`, {
        method: 'GET',  // Change to GET as we are passing data in the URL
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        toast.error("Error Fetching user");
        return { error: "error" };
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("There was an error", error);
      toast.error("An error occurred while getting user.");
      throw error;
    }
  };

export const getQuizzes = async() => {
    try {
        const response = await fetch(`${ENDPOINT}api/quiz/getAllQuizzes`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        });        

        const data = await response.json();

        if (!response.ok) {
            toast.error("Error Fetching Quizzes");
            return {error: "error"};
        }

        return data;
        
    } catch (error) {
        console.error("There was an error", error);
        toast.error("An error occurred while registering.");
        throw error;     
    }

}

export const getQuizzesByAuthor = async(id) => {
    try {
        const response = await fetch(`${ENDPOINT}api/quiz/getQuizzesByAuthor?authorId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        });        

        const data = await response.json();

        if (!response.ok) {
            toast.error("Error Fetching Quizzes");
            return {error: "error"};
        }

        return data;
        
    } catch (error) {
        console.error("There was an error", error);
        toast.error("An error occurred while registering.");
        throw error;     
    }

}

export const postQuiz = async(title, description, questions) => {
    try {
        const response = await fetch(`${ENDPOINT}api/quiz/postQuiz`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                quizName: title,
                quizDescription: description,
                quizAuthorId: parseInt(localStorage.getItem("userID"), 10),
                quizQuestions: questions,
            })
        });        

        const data = await response.json();

        if (!response.ok) {
            toast.error("Error Posting Quiz");
            return {error: "error"};
        }

        return data;
        
    } catch (error) {
        console.error("There was an error", error);
        toast.error("An error occurred while registering.");
        throw error;     
    }

}