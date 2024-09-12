const User = require("../models/user")
const bcrypt = require("bcrypt");

// POST register
exports.userRegister = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        const users = await User.find({});
        if (existingUser) {
            return res.status(422).json({
                success: false,
                msg: 'User already exists with this email'
            });
        }
        const user = await new User({ name, email, password, user_id: users.length + 1 })
        await user.save()
        res.status(200).json({
            success: true,
            msg: 'User registered successfully',
            user
        });
    } catch (e) {
        res.status(404).json({
            success: false,
            msg: e.message
        })
    }
}

// POST login
exports.userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).json({
                success: false,
                msg: 'Email not found'
            });
        }
        // password from body user.password from db {user come from above code}
        const passwordIsCrt = await bcrypt.compare(password, user.password);
        if (!passwordIsCrt) {
            return res.status(422).json({ msg: " Invalid password" });
        }
        res.status(200).json({
            success: true,
            msg: 'Login successful',
            user
        });
    } catch (e) {
        res.status(404).json({
            success: false,
            msg: e.message
        });
    }
};
