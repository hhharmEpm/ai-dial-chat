import { Import } from '@/src/testData';
import { GeneratorUtil } from '@/src/utils/generatorUtil';
import * as fs from 'fs';
import { PathLike } from 'fs';
import path from 'path';

export class FileUtil {
  public static writeDataToFile(data: unknown) {
    const stringData = JSON.stringify(data);
    const filename = `${GeneratorUtil.randomString(10)}.json`;
    fs.writeFileSync(
      path.join(Import.importPath, filename),
      stringData,
      'utf-8',
    );
    return filename;
  }

  public static readFileData(path: string) {
    const content = fs.readFileSync(path, 'utf-8');
    return JSON.parse(content);
  }

  public static removeExportFolder() {
    FileUtil.removeFolder(Import.exportPath);
  }

  public static removeFolder(path: PathLike) {
    fs.rmSync(path, {
      recursive: true,
      force: true,
    });
  }

  public static deleteImportFile(filename: string) {
    if (filename !== undefined) {
      fs.unlinkSync(path.join(Import.importPath, filename));
    }
  }
}