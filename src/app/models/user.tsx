import * as R from "ramda";

interface UserParams {
  id: string;
  name: string;
  email: string;
  admin: boolean;
}

export class UserModel {
  id: string;
  name: string;
  email: string;
  admin: boolean;

  constructor(parms: UserParams) {
    // if (!this.validateParams(parms)) {
    //   console.error("사용자 파라미터가 유효하지 않습니다");
    // }
    if (!this.validateEmail(parms.email)) {
      console.error("이메일 형식이 유효하지 않습니다");
    }
    this.id = parms.id;
    this.name = parms.name;
    this.email = parms.email;
    this.admin = parms.admin;
  }


  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  public validateParams(params:any):boolean {
    const requiredKeys = ['id', 'name', 'email', 'admin'];
    // return R.equals(R.keys(params).sort(), requiredKeys.sort());
    return requiredKeys.includes(params)
  }

  public funcConsole(params:any):UserModel { 
    return this
  }
}
