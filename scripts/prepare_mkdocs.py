#!/usr/bin/env python3
"""
MkDocs 构建前准备脚本：
  1. 从根目录 README.md 生成 docs/index.md
  2. 将根目录 assets/ 镜像到 docs/assets/

用法：
  python scripts/prepare_mkdocs.py
"""

from __future__ import annotations

import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
README = REPO_ROOT / "README.md"
DOCS = REPO_ROOT / "docs"
INDEX = DOCS / "index.md"
ASSETS_SRC = REPO_ROOT / "assets"
ASSETS_DST = DOCS / "assets"


def github_repo_slug() -> str | None:
    if slug := os.environ.get("GITHUB_REPOSITORY"):
        return slug.strip()
    try:
        url = subprocess.check_output(
            ["git", "remote", "get-url", "origin"],
            text=True,
            cwd=REPO_ROOT,
            stderr=subprocess.DEVNULL,
        ).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    m = re.search(r"github\.com[:/]([^/]+)/([^/.]+)", url.replace(".git", ""))
    return f"{m.group(1)}/{m.group(2)}" if m else None


def generate_index(slug: str | None) -> None:
    if not README.is_file():
        print("Missing README.md at repository root.", file=sys.stderr)
        sys.exit(1)

    text = README.read_text(encoding="utf-8")
    text = text.replace("](./docs/", "](./")

    if slug:
        blob_base = f"https://github.com/{slug}/blob/main"
        text = text.replace(
            "](./.cursor/rules/project-guide.mdc)",
            f"]({blob_base}/.cursor/rules/project-guide.mdc)",
        )

    INDEX.write_text(text, encoding="utf-8")
    print(f"Wrote {INDEX.relative_to(REPO_ROOT)}")


def mirror_assets() -> None:
    if ASSETS_SRC.is_dir():
        if ASSETS_DST.exists():
            shutil.rmtree(ASSETS_DST)
        shutil.copytree(ASSETS_SRC, ASSETS_DST)
        print(f"Mirrored assets to {ASSETS_DST.relative_to(REPO_ROOT)}")
    elif ASSETS_DST.exists():
        shutil.rmtree(ASSETS_DST)


def main() -> None:
    slug = github_repo_slug()
    generate_index(slug)
    mirror_assets()


if __name__ == "__main__":
    main()
