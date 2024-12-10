// import axios from "axios";

export const getFileIrl = async (url: string) => {
    try {
        const res = await fetch(url)
        console.log("Fetch request successful", res);
        return res;
    } catch (error) {
        console.error("Fetch request failed", error);
        throw new Error('Failed to fetch');
    }
};
