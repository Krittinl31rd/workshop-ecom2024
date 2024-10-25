exports.Register = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password })
    } catch (err) {
        console.log(err)
    }
} 
