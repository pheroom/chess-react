import React, {FC} from 'react';
import githubIcon from "../assets/icon/github.png"
import logo from "../assets/logo.png"
import arrowDown from "../assets/icon/arrow-down.png"
import arrowUp from "../assets/icon/arrow-up.png"

interface HeaderProps{
  settingsVision: boolean,
  setSettingsVision: (status: boolean) => void
}

const Header: FC<HeaderProps> = ({settingsVision, setSettingsVision}) => {
  return (
    <header className={'header'}>
      <div className="container">
        <div className="header__inner">
          <div className={'header__logo'}>
            <img className={'logo'} src={logo} alt="chess logo"/>
            <div className="header__logo-text">
              <h2 className={'header__title'}>Chess</h2>
              <a className={'creator'} target="_blank" rel="noreferrer" href={'https://github.com/pheroom/chess-react'}>
                <span className={'creator__text'}>by Pheroom</span>
                <img className={'creator__img'} src={githubIcon} alt="github"/>
              </a>
            </div>
          </div>
          {settingsVision
            ? <div onClick={() => setSettingsVision(!settingsVision)} className='settings-open-btn'>
                <span>Скрыть настройки</span>
                <img src={arrowUp} alt="arrowUp"/>
              </div>
            : <div onClick={() => setSettingsVision(!settingsVision)} className='settings-close-btn'>
                <span>Показать настройки</span>
                <img src={arrowDown} alt="arrowDown"/>
              </div>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;