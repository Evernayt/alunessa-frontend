export class UpdateDrawingDto {
  readonly id?: number;
  readonly name?: string;
  readonly description?: string;
  readonly mediumImage?: string;
  readonly smallImage?: string;
  readonly mediumWidth?: number;
  readonly mediumHeight?: number;
  readonly smallWidth?: number;
  readonly smallHeight?: number;
  readonly blurHash?: string;
  readonly orderIndex?: number;
}
