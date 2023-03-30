const startServer = (api) => {
    const port = process.env.PORT || 5500;
    api.listen(port, () => {
        console.log(`Server running login on port ${port}`)
    });
}

export default startServer;