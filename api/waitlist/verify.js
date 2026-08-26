import { handleWaitlistApi } from '../../../server/waitlistRuntime.js';

export default async function handler(req, res) {
  return handleWaitlistApi(req, res);
}

