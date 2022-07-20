export class SnapshotData {
  snapshotHeight: string;
  snapshotSize: string;
  snapshotBlockTime: string;

  constructor(snapshotHeight: string, snapshotSize: string, snapshotBlockTime: string) {
    this.snapshotHeight = snapshotHeight;
    this.snapshotSize = snapshotSize;
    this.snapshotBlockTime = snapshotBlockTime;
  }
}
