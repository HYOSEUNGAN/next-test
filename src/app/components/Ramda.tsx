
import React from "react";
import * as R from "ramda";
import { user } from "../constants/User";
import { UserModel } from "../models/user";

const Ramda = () => {
  // true || false
  const gt10 = (x: number) => x > 10;
  const even = (x: number) => x % 2 === 0;
  const f = R.either(gt10, even);

  // try & catch || ifelse
  const riskyOperation = (x: number): number => {
    if (x < 10) throw new Error("Negative input is not allowed");
    return x * 2;
  };

  const handleError = (error: Error): string => {
    console.error(error.message);
    return "Error occurred";
  };

  const safeOperation = R.tryCatch(riskyOperation, handleError);

  // const processNumber = (num: number): string | number => {
  //   return R.ifElse(
  //     R.is(Number),
  //     safeOperation,        // Apply the safe operation if input is a number
  //     () => 'Invalid input' // Return this message if input is not a number
  //   )(num);
  // };

  const fetchData = new UserModel(user)

  console.log(fetchData.funcConsole(user))

  // console.log(process.env.customKey)

  return (
    <div>
      {f(50) && "true"}
      <div>

      </div>
    </div>
  );
};

export default Ramda;
