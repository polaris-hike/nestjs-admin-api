import bcrypt from 'bcrypt';

export const encrypt = async (password: string) => {
    const hash = 10;

    return bcrypt.hashSync(password, hash);
};

export const decrypt = (password: string, hashed: string) => {
    return bcrypt.compareSync(password, hashed);
};
