import { setFailed } from "@actions/core";
import { readFileSync } from "fs";
import { exit } from "process";

export function readDistroVersion(distroConfPath) {
  const distroConf = readFileSync(distroConfPath).toString();
  const matches = distroConf.match(
    /DISTRO_VERSION\s*=\s*"(\d+)\.(\d+)\.(\d+)"/
  );
  if (matches === null) {
    setFailed(
      `DISTRO_VERSION in ${distroConfPath} does not match \\d+\\.\\d+\\.\\d+`
    );
    exit(1);
  }
  return {
    major: parseInt(matches[1]),
    minor: parseInt(matches[2]),
    patch: parseInt(matches[3]),
  };
}
