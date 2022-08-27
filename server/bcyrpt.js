import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    console.log(salt)
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw)
}

hashPassword();