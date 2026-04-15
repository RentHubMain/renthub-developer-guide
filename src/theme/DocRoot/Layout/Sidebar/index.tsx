import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import DocSidebar from '@theme/DocSidebar';
import type {Props} from '@theme/DocRoot/Layout/Sidebar';

import styles from './styles.module.css';

const SIDEBAR_LABELS: Record<string, string> = {
  quickStartSidebar: '快速开始',
  vibeCodingSidebar: 'Vibe Coding',
  projectMgmtSidebar: '项目管理',
  uiDesignSidebar: '界面设计',
  devKnowledgeSidebar: '开发知识',
};

function ResetOnSidebarChange({children}: {children: ReactNode}) {
  const sidebar = useDocsSidebar();
  return (
    <React.Fragment key={sidebar?.name ?? 'noSidebar'}>
      {children}
    </React.Fragment>
  );
}

function SidebarSectionTitle(): ReactNode {
  const sidebar = useDocsSidebar();
  const label = SIDEBAR_LABELS[sidebar?.name ?? ''] ?? '';
  return <h2 className={styles.sidebarSectionTitle}>{label}</h2>;
}

export default function DocRootLayoutSidebar({
  sidebar,
}: Props): ReactNode {
  const {pathname} = useLocation();

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
      )}>
      <ResetOnSidebarChange>
        <div className={styles.sidebarViewport}>
          <div className={styles.sidebarInner}>
            <SidebarSectionTitle />
            <DocSidebar
              sidebar={sidebar}
              path={pathname}
              onCollapse={() => {}}
              isHidden={false}
            />
          </div>
        </div>
      </ResetOnSidebarChange>
    </aside>
  );
}
