export class UpdateDrawingDto {
  readonly id?: number;
  readonly name?: string;
  readonly description?: string;
  readonly originalImageName?: string;
  readonly compressedImageName?: string;
  readonly orderIndex?: number;
}
