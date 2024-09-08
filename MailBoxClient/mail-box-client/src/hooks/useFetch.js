const fetchMail = async (email, pre) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DATABASE_URL}/${pre}${email}.json`);

        // Check if the response is ok (status 200-299)
        if (!res.ok) {
            throw new Error('Failed to fetch mails');
        }

        let data = await res.json();

        // Safely convert to array if data exists
        return data ? Array.from(Object.entries(data)) : [];
    } catch (error) {
        console.error("Error fetching mail:", error);
        return [];
    }
};

export default fetchMail;
