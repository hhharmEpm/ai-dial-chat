import { ResultFolder } from '@/src/testData';
import { FileUtil } from '@/src/utils';
import type { FullConfig } from '@playwright/test';
import path from 'path';

export const isApiStorageType =
  process.env.STORAGE_TYPE === 'api' || process.env.STORAGE_TYPE === undefined;

export const ExecutionResults = {
  allureReportPath: path.resolve(
    __dirname,
    `../../${ResultFolder.allureChatReport}`,
  ),
  allureOverlayReportPath: path.resolve(
    __dirname,
    `../../${ResultFolder.allureOverlayReport}`,
  ),
  chatHtmlReportPath: path.resolve(
    __dirname,
    `../../${ResultFolder.chatHtmlReport}`,
  ),
  overlayHtmlReportPath: path.resolve(
    __dirname,
    `../../${ResultFolder.overlayHtmlReport}`,
  ),
  testResultsPath: path.resolve(__dirname, `../../${ResultFolder.testResults}`),
};

async function globalSetup(config: FullConfig) {
  if (config.projects[0].name === 'auth') {
    for (const path of Object.values(ExecutionResults)) {
      FileUtil.deleteFolder(path);
    }
  }
}

export default globalSetup;
