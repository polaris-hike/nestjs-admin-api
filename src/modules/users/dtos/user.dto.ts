import { Length } from 'class-validator';

export class CreateUserDto {
    /**
     * 用户名
     */
    @Length(4, 30, {
        always: true,
        message: '用户名长度必须为$constraint1到$constraint2',
    })
    username: string;

    /**
     * 昵称:不设置则为用户名
     */
    @Length(3, 20, {
        always: true,
        message: '昵称必须为$constraint1到$constraint2',
    })
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
