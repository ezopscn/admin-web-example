import * as Icon from '@ant-design/icons';
import React from 'react';

// 生成菜单结构
function GetMenuItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// 文字转换成图标
function ConvertTextToIcon(iconName) {
  return React.createElement(Icon[iconName]);
}

// 生成主菜单树
function GenerateMenuTree(parentId, menus) {
  const tree = [];
  for (const menu of menus) {
    if (menu.parent_id === parentId) {
      const newMenu = GetMenuItem(
        menu.label,
        menu.key,
        menu.icon ? ConvertTextToIcon(menu.icon) : null, // icon 问题
        menu.children,
      );
      newMenu.children = GenerateMenuTree(menu.id, menus);
      // 没有子菜单也显示下拉标识问题
      if (newMenu.children.length === 0) {
        delete newMenu.children;
      }
      tree.push(newMenu);
    }
  }
  return tree;
}

// 生成 Menu Tree 数据结构
function GenerateMenuTreeData(parentId, menus) {
  const tree = [];
  for (const menu of menus) {
    if (menu.parent_id === parentId) {
      const newMenu = {
        title: menu.label,
        key: menu.key,
        children: menu.children,
      };
      newMenu.children = GenerateMenuTreeData(menu.id, menus);
      // 没有子菜单也显示下拉标识问题
      if (newMenu.children.length === 0) {
        newMenu.isLeaf = true;
        delete newMenu.children;
      }
      tree.push(newMenu);
    }
  }
  return tree;
}

// 生成 Tree 数据结构
function GenerateTreeData(parentId, dataList) {
  const tree = [];
  for (const each of dataList) {
    if (each.parent_id === parentId) {
      const newObj = {
        title: each.name,
        key: each.id,
        children: each.children,
      };
      newObj.children = GenerateTreeData(each.id, dataList);
      if (newObj.children.length === 0) {
        newObj.isLeaf = true;
        delete newObj.children;
      }
      tree.push(newObj);
    }
  }
  return tree;
}

// 获取所有父级 Key，用于展开树型结构
const GetNotLeafKeys = (treeData) => {
  const keys = [];

  function traverse(data) {
    for (const node of data) {
      if (!node.isLeaf) {
        keys.push(node.key);
        traverse(node.children);
      }
    }
  }

  traverse(treeData);
  return keys;
};

// 通过部门 Id 和部门列表获取递归获取用户部门信息字符串
const GetDepartmentTreeName = (deptId, depts) => {
  // 找到当前部门
  const currentDept = depts.find((dept) => dept.id === deptId);

  // 防止第一次加载报错
  if (currentDept) {
    // 如果当前部门没有父部门，则直接返回当前部门名称
    if (currentDept.parent_id === 0) {
      return currentDept.name;
    }
    // 递归获取父部门名称
    const parentDeptName = GetDepartmentTreeName(currentDept.parent_id, depts);
    // 拼接部门名称
    return `${parentDeptName} - ${currentDept?.name}`;
  }
};

export { ConvertTextToIcon, GenerateMenuTree, GenerateMenuTreeData, GenerateTreeData, GetNotLeafKeys, GetDepartmentTreeName };
