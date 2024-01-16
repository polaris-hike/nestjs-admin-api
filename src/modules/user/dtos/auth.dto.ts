import { IsNotEmpty, IsOptional, Length } from 'class-validator';

/**
 * 用户正常方式登录
 */
export class CredentialDto {
    /**
     * 登录凭证:可以是用户名,手机号,邮箱地址
     */
    @Length(4, 30, {
        message: '登录凭证长度必须为$constraint1到$constraint2',
        always: true,
    })
    @IsNotEmpty({ message: '登录凭证不得为空', always: true })
    credential: string;

    /**
     * 用户密码:密码必须由小写字母,大写字母,数字以及特殊字符组成
     */
    // @IsPassword(4, {
    //     message: '密码必须由小写字母,大写字母,数字以及特殊字符组成',
    //     always: true,
    // })
    @Length(8, 50, {
        message: '密码长度不得少于$constraint1',
        always: true,
    })
    password: string;
}

export class RegisterDto {
    /**
     * 用户名
     */
    @Length(4, 30, {
        always: true,
        message: '用户名长度必须为$constraint1到$constraint2',
    })
    @IsNotEmpty({ message: '用户名不得为空', always: true })
    username: string;

    /**
     * 昵称:不设置则为用户名
     */
    @Length(3, 20, {
        always: true,
        message: '昵称必须为$constraint1到$constraint2',
    })
    @IsOptional({ always: true })
    nickname?: string;

    /**
     * 用户密码:密码必须由小写字母,大写字母,数字以及特殊字符组成
     */
    // @IsPassword(4, {
    //     message: '密码必须由小写字母,大写字母,数字以及特殊字符组成',
    //     always: true,
    // })
    @Length(8, 50, {
        message: '密码长度不得少于$constraint1',
        always: true,
    })
    password: string;
}
