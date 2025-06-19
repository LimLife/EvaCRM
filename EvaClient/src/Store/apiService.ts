export const apiService = {
    fetchData: async () =>
    {
        const response = await fetch('');
        return response.json();
    },
};