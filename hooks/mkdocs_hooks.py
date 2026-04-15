"""MkDocs 构建钩子：把仅存在于仓库内的路径改成站点内或 GitHub 上可访问的链接。"""

from __future__ import annotations

import os


def on_page_markdown(markdown: str, **_kwargs) -> str:
    # 源码在 GitHub 上指向仓库根目录 README.md；MkDocs 首页由 prepare_mkdocs.py 生成 docs/index.md
    markdown = markdown.replace("](../../README.md)", "](../index.md)")
    slug = os.environ.get("GITHUB_REPOSITORY")
    if slug:
        skill = f"https://github.com/{slug}/blob/main/.cursor/skills/renthub-commit/SKILL.md"
        markdown = markdown.replace(
            "](../../.cursor/skills/renthub-commit/SKILL.md)",
            f"]({skill})",
        )
    return markdown
