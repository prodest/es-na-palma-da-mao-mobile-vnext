import { Destination } from "../state";

/**
 * @description wizard step output interface
 * @author David Vilaça
 * @date 2019-07-22
 * @export
 * @interface IBaseStepOutput
 */
export interface IBaseStepOutput {
  titleForward: string;
  sender: string;
  role: string;
}

/**
 * @description wizard addressees step output interface
 * @author David Vilaça
 * @date 2019-07-24
 * @export
 * @interface IAddresseesStepOutput
 * @extends {Array<Destination>}
 */
export interface IAddresseesStepOutput extends Array<Destination> {}

/**
 * @description wizard doc step output interface
 * @author David Vilaça
 * @date 2019-07-24
 * @export
 * @interface IDocStepOutput
 */
export interface IDocStepOutput {
  name: string;
  documentType: number;
  documentPaperType: number;
  documentAssignType: number;
  file: string;
}
