import { SetMetadata } from '@nestjs/common';

import { ALLOW_GUEST } from '../../auth/constants';

export const Guest = () => SetMetadata(ALLOW_GUEST, true);
