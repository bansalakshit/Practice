exports.error = (req , res) => {
    res.status(400).send('<h1>Page not Found</h1>');
}