# WorldArena Track 1 offline explainer

## Open

1. Extract the whole ZIP. Do not move an individual HTML away from `assets/`.
2. Double-click `index.html`.
3. Choose FD or Transfer. No network or Python environment is required.

The pages are tested for modern Chrome, Edge, Firefox and Safari. Videos are
H.264/yuv420p MP4 with fast-start metadata. If a browser blocks inline playback,
use the **直接打开 / 下载 MP4** link below the player.

## Demos

- FD: `fixed_scene_task_episode471`, 163 frames, 640×480, 25 fps.
- Transfer: episode 593, 652 frames, 25 fps.
  - `transfer_episode593_overlay.mp4` — default overlay comparison.
  - `transfer_episode593_generated.mp4` — generated video only.
  - `transfer_episode593_control.mp4` — projected control only.

## Presentation controls

- Arrow Up/Down, PageUp/PageDown, or Space: change section.
- `F`: full screen.
- **放大图**: open any technical SVG on a full-screen, scrollable canvas; press
  `Esc` to close it.
- Bottom-left print button: print or export to PDF.

Keep the directory structure unchanged so relative image/video links continue to
work. The same files outside the ZIP remain directly viewable in the source
workspace.
