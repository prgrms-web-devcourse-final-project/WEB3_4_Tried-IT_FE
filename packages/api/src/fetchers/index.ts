import * as adminFetchers from "./admin/fetchers";
import * as applyClassFetchers from "./apply-class/fetchers";
import * as authFetchers from "./auth/fetchers";
import * as chatFetchers from "./chat/fetchers";
import * as classFetchers from "./class/fetchers";
import * as filesFetchers from "./files/fetchers";
import * as memberFetchers from "./member/fetchers";
import * as mentorFetchers from "./mentor/fetchers";

export const dementorApiFetchers = {
  admin: adminFetchers,
  applyClass: applyClassFetchers,
  auth: authFetchers,
  chat: chatFetchers,
  class: classFetchers,
  files: filesFetchers,
  member: memberFetchers,
  mentor: mentorFetchers,
};
