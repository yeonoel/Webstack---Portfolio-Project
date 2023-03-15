const startServer = (api) => {
    const port = process.env.PORT || 5000;
    api.listen(port, () => {
        console.log(`Server running login on port ${port}`)
    });
}

export default startServer();