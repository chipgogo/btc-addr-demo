import { Text } from 'components/Text'
import { InlineWrapper } from 'components/Wrapper'
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick'
import { darken } from 'polished'
import { useRef, useState } from 'react'
import { ChevronDown } from 'react-feather'
import styled from 'styled-components'

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuButton = styled.div`
  background: transparent;
  color: ${({ theme }) => theme.colors.text1};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  width: 120px;
  border: ${({ theme }) => `1px solid ${theme.colors.secondary1}`};
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  margin-left: auto;

  &:hover {
    // background-color: ${({ theme }) => darken(0.05, theme.colors.primary1)};
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }
`

const Menu = styled.div<{ active?: boolean }>`
  background: #ffffff;
  position: absolute;
  top: 35px;
  right: 0;
  width: 100%;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

  opacity: ${({ active }) => (active ? '1' : '0')};
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  transform: ${({ active }) => (active ? 'translateY(0)' : 'translateY(-20px)')};
`

const MenuUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const MenuLi = styled.li<{ active?: boolean }>`
  border-bottom: 1px solid #dddddd;
  padding: 0.5rem;
  background: ${({ active, theme }) => (active ? theme.colors.primary1 : 'transparent')};
  color: ${({ active, theme }) => (active ? '#fff' : theme.colors.text1)};
`

interface DropdownProps {
  items: string[]
  callback: (selected: string) => void
}

export default function Dropdown({
  items,
  callback,
}: DropdownProps) {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [selected, setSelected] = useState<string>(items[0])

  // click of the main dropdown
  const onClick = () => {
    setIsActive(!isActive)
  }

  const onSelect = (value: string) => {
    setSelected(value)
    setIsActive(!isActive)
    callback(value)
  }

  return (
    <MenuContainer className="menu-container">
      <MenuButton onClick={onClick} className="menu-trigger">
        <InlineWrapper width="120px" justifyContent="space-between">
          <Text padding="0" lineHeight="0">
            {selected}
          </Text>
          <ChevronDown size="14px" />
        </InlineWrapper>
      </MenuButton>
      <Menu ref={dropdownRef} active={isActive}>
        <MenuUl>
          {items.map((item, index) => (
            <MenuLi key={index} onClick={() => onSelect(item)} active={item === selected}>
              {item}
            </MenuLi>
          ))}
        </MenuUl>
      </Menu>
    </MenuContainer>
  )
}
