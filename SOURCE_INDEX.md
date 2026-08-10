# WorldArena Track 1 route decks — source index

Evidence snapshot: 2026-08-07 UTC.

## Path aliases

- `FD` = `/home/jiaheng.geng/gengjiaheng/dev_cosmos/cosmos-framework-main/.claude/worktrees/worldarena-track1-fd-sft`
- `TR` = `/home/jiaheng.geng/gengjiaheng/dev_cosmos/cosmos-framework-main/.claude/worktrees/worldarena-track1-transfer-sft`
- `RV` = `/home/jiaheng.geng/gengjiaheng/dev_cosmos/cosmos-framework-main/.claude/worktrees/robotwin-ee-viz`
- `WA` = `/home/jiaheng.geng/gengjiaheng/dev_worldarena/WorldArena-2.0`

The slide footers use these aliases so the citations remain readable. All citations below use `file:line` form.

## FD — action-to-video

- Recipe, trainable modules, data size, window, temporal sampling, optimizer and 10k schedule: `FD/cosmos_framework/configs/base/experiment/action/posttrain_config/fd_robotwin_nano.py:47-250`
- LeRobot schema, 16-D bimanual EEF state/action and aligned video/action windows: `FD/cosmos_framework/data/generator/action/datasets/robotwin_lerobot_dataset.py:19-47`, `FD/cosmos_framework/data/generator/action/datasets/robotwin_lerobot_dataset.py:97-127`, `FD/cosmos_framework/data/generator/action/datasets/robotwin_lerobot_dataset.py:317-354`
- Relative translation/rotation with the FD path's XYZW/SciPy contract: `FD/cosmos_framework/data/generator/action/datasets/robotwin_lerobot_dataset.py:97-127`
- Quantile normalization and clipping: `FD/cosmos_framework/data/generator/action/datasets/robotwin_lerobot_dataset.py:317-341`
- 16→64 zero padding: `FD/cosmos_framework/data/generator/action/action_processing.py:163-181`, `FD/cosmos_framework/data/generator/action/action_processing.py:205-231`
- Sequence plan and clean/noisy token policy: `FD/cosmos_framework/data/generator/action/transforms.py:284-324`
- Multimodal forward path and vision/action heads: `FD/cosmos_framework/model/generator/mot/cosmos3_vfm_network.py:136-157`, `FD/cosmos_framework/model/generator/mot/cosmos3_vfm_network.py:673-779`, `FD/cosmos_framework/model/generator/omni_mot_model.py:1040-1097`
- Nano backbone depth and width (`36` layers, hidden size `4096`): `FD/cosmos_framework/model/generator/reasoner/qwen3_vl/configs/Qwen3-VL-8B-Instruct.json:15-21`
- Dual understanding/generation QKV projections, generation output projection and dense generation MLP path: `FD/cosmos_framework/model/generator/mot/unified_mot.py:450-530`, `FD/cosmos_framework/model/generator/mot/unified_mot.py:595-721`, `FD/cosmos_framework/model/generator/mot/unified_mot.py:989-1176`, `FD/cosmos_framework/model/generator/mot/unified_mot.py:1229-1252`
- The historical `*_moe_gen` name refers to the dense generation-path weights in this Nano backbone; there is no sparse expert router: `FD/cosmos_framework/model/generator/mot/unified_mot.py:1229-1252`
- Two-way attention geometry: causal text queries and full generation queries over all tokens: `FD/cosmos_framework/model/generator/mot/attention.py:88-145`
- Rectified-flow interpolation and target velocity: `FD/cosmos_framework/model/generator/diffusion/rectified_flow.py:176-215`, `FD/cosmos_framework/model/generator/omni_mot_model.py:972-1007`
- Forward-dynamics sampling default of 30 UniPC steps: `FD/cosmos_framework/inference/defaults/forward_dynamics/sample_args.json:1-5`
- AR design, per-window action anchoring, stitching, exact-length trim and persistent worker: `FD/tools/worldarena_track1/run_fd_ar.py:2-43`, `FD/tools/worldarena_track1/run_fd_ar.py:160-249`, `FD/tools/worldarena_track1/run_fd_ar.py:257-383`
- Multi-GPU atomic claims, heartbeat, TTL and resume behavior: `FD/tools/worldarena_track1/run_fd_ar_multi.sh:4-28`, `FD/tools/worldarena_track1/run_fd_ar_multi.sh:50-95`
- Reproduction TOML and paired launcher: `FD/examples/toml/sft_config/fd_robotwin_repro.toml:18-59`, `FD/examples/launch_sft_fd_robotwin.sh:31-46`

## Transfer — control-video-to-video

- Recipe, trainable generation stack, 97-frame windows, 25 Hz and 25k schedule: `TR/cosmos_framework/configs/base/experiment/action/posttrain_config/transfer_robotwin_nano.py:4-31`, `TR/cosmos_framework/configs/base/experiment/action/posttrain_config/transfer_robotwin_nano.py:84-115`, `TR/cosmos_framework/configs/base/experiment/action/posttrain_config/transfer_robotwin_nano.py:175-251`
- Two aligned visual items and synchronized frame decoding: `TR/cosmos_framework/data/generator/action/datasets/robotwin_transfer_dataset.py:13-61`, `TR/cosmos_framework/data/generator/action/datasets/robotwin_transfer_dataset.py:288-339`
- Shared preprocessing and transfer sequence plan: `TR/cosmos_framework/data/generator/action/datasets/transfer_transforms.py:37-101`, `TR/cosmos_framework/data/generator/augmentors/transfer_control_transform.py:124-195`
- Packed multi-vision ordering and shared temporal coordinates: `TR/cosmos_framework/data/generator/sequence_packing/packers.py:291-335`
- Two-way single-control attention and multi-control extension: `TR/cosmos_framework/model/generator/mot/attention.py:88-145`, `TR/cosmos_framework/model/generator/mot/attention.py:270-370`
- Transfer attention metadata and control weighting: `TR/cosmos_framework/model/generator/mot/cosmos3_vfm_network.py:1001-1047`
- 4:3 480-tier bucket geometry: `TR/cosmos_framework/data/generator/utils.py:41-54`, `TR/cosmos_framework/inference/vision.py:194-208`
- In-context transfer, control guidance and AR chunking/stitching: `TR/cosmos_framework/inference/transfer.py:43-54`, `TR/cosmos_framework/inference/transfer.py:144-221`, `TR/cosmos_framework/inference/transfer.py:377-596`
- Temporal reflection/repeat padding for a short final control chunk: `TR/cosmos_framework/inference/vision.py:212-230`, `TR/cosmos_framework/inference/transfer.py:447-455`, `TR/cosmos_framework/inference/transfer.py:488-496`
- Inference-time dropped-control CFG and per-chunk `seed + chunk_id`: `TR/cosmos_framework/inference/transfer.py:274-317`, `TR/cosmos_framework/inference/transfer.py:551-567`
- Control-CFG postprocessing is followed by standard text-CFG mixing: `TR/cosmos_framework/model/generator/omni_mot_model.py:2486-2496`
- Training dropout applies to caption tokenization; no explicit control-item dropout is configured: `TR/cosmos_framework/data/generator/action/datasets/transfer_transforms.py:53-93`
- Transfer inference arguments and defaults: `TR/cosmos_framework/inference/args.py:782-850`, `TR/cosmos_framework/inference/defaults/video2video/sample_args.json:1-21`
- Track1 JSON contract, explicit 4:3 aspect ratio and first-frame/control wiring: `TR/tools/worldarena_track1/build_transfer_inputs.py:13-35`, `TR/tools/worldarena_track1/build_transfer_inputs.py:91-168`, `TR/tools/worldarena_track1/build_transfer_inputs.py:254-267`
- Single- and multi-GPU launch behavior: `TR/tools/worldarena_track1/run_transfer.sh:44-98`, `TR/tools/worldarena_track1/run_transfer_multi.sh:4-25`, `TR/tools/worldarena_track1/run_transfer_multi.sh:77-147`
- Reproduction TOML and paired launcher: `TR/examples/toml/sft_config/transfer_robotwin_repro.toml:25-66`, `TR/examples/launch_sft_transfer_robotwin.sh:34-49`

## Control-video renderer

- Absolute 16-D EEF schema and WXYZ quaternion convention: `RV/tools/worldarena_track1/visualize_ee_projection.py:53-63`, `RV/tools/worldarena_track1/visualize_ee_projection.py:186-202`
- D435 FOV, camera basis and pinhole world-to-camera projection: `RV/tools/worldarena_track1/visualize_ee_projection.py:97-160`
- Left/right color, relative-depth disk radius and grasp salience: `RV/tools/worldarena_track1/visualize_ee_projection.py:106-114`, `RV/tools/worldarena_track1/visualize_ee_projection.py:330-375`
- Orientation gizmo and future `[t,t+25]` trajectory: `RV/tools/worldarena_track1/visualize_ee_projection.py:385-433`
- Training-control renderer and output layout: `RV/tools/worldarena_track1/batch_control_videos.py:2-20`, `RV/tools/worldarena_track1/batch_control_videos.py:130-156`
- Training renderer fps comes from metadata with a 50 fps fallback: `RV/tools/worldarena_track1/batch_control_videos.py:117-127`
- Track1 HDF5 renderer, per-row frame mapping and current resolution defaults: `RV/tools/worldarena_track1/batch_control_videos_test.py:2-28`, `RV/tools/worldarena_track1/batch_control_videos_test.py:78-87`, `RV/tools/worldarena_track1/batch_control_videos_test.py:112-158`
- Fixed head-camera extrinsic used by the renderer: `/remote-sync/jiaheng.geng/worldarena_data/embodiments/aloha-agilex/config.yml:26-40`

## WorldArena 2.0 Track 1

- Required per-episode video deliverable, resolution/fps guidance and HF package contract: `WA/assets/TRACK1_HF_SUBMISSION_GUIDELINE_CN.md:24-48`, `WA/assets/TRACK1_HF_SUBMISSION_GUIDELINE_CN.md:64-195`
- HDF5 trajectory fields and lack of timestamps: `WA/tools/read_hdf5.py:4-14`, `WA/tools/read_hdf5.py:43-47`
- Submission renaming, copy, completeness and tar layout: `WA/tools/pack_track1_submission.py:2-19`, `WA/tools/pack_track1_submission.py:54-88`, `WA/tools/pack_track1_submission.py:180-240`
- Validation video matching and standard metrics: `WA/video_quality_ood/run_track1_eval.sh:61-63`, `WA/video_quality_ood/run_track1_eval.sh:98-109`
- Gripper trajectory extraction and left/right assignment: `WA/video_quality_ood/processing/detection_tracking.py:184-208`, `WA/video_quality_ood/processing/detection_tracking.py:342-363`, `WA/video_quality_ood/processing/detection_tracking.py:406-432`
- Inverse mean-DTW trajectory score: `WA/video_quality_ood/WorldArena/trajectory_accuracy.py:181-220`
- VLM judging and 16-frame sampling: `WA/video_quality_ood/VLM_judge.py:47-76`, `WA/video_quality_ood/VLM_judge.py:84-150`
- JEPA and aggregate EWM score: `WA/video_quality_ood/csv_results/aggregate_results.py:7-49`, `WA/video_quality_ood/csv_results/aggregate_results.py:216-240`

## Snapshot caveat

- FD HEAD at audit time: `bcd1e22`; the Track1 AR tools used by this deck include uncommitted worktree content.
- Transfer HEAD at audit time: `f1bc18c`; launcher/filter files include uncommitted worktree content.
- Control-renderer HEAD at audit time: `84c52ce`.
