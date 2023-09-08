import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

declare const __GIT_VERSION__: string;
declare const __BUILD_TIME__: number;

class BuildInfo {
  @ApiProperty({
    example: '123456a/1693424403000',
    description: 'Git tag/commit id with build timestamp.',
  })
  readonly build: string;
}

@ApiTags('Root')
@Controller()
export class RootController {
  /**
   * Used to fetch git version and build time. Can be used to check health of API service.
   *
   * @returns build info
   */
  @Get()
  @ApiOperation({ summary: 'Get build info' })
  @ApiResponse({ status: HttpStatus.OK, type: BuildInfo })
  getBuildInfo(): BuildInfo {
    return { build: `${__GIT_VERSION__}/${__BUILD_TIME__}` };
  }
}
