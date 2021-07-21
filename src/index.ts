/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Rowe Wilson Frederisk Holme. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function hello(world: string = "world"): string {
  console.log(world)
  return `Hello ${world}! ` + $("<br/>").toString();
}
hello();
