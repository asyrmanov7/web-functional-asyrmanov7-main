const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data: {
            content: string;
        } = await response.json();

        return data.content
    } catch (e) {
        return `<speak><s>There was an error</s></speak>`
    }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    const arrOfSentences = []
    const arr = content.split("<s>")
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("</s>")) {
            const sentences = arr[i].split("</s>")
            arrOfSentences.push(sentences[0])
        }
    }
    return arrOfSentences
};

export { fetchContent, parseContentIntoSentences };
