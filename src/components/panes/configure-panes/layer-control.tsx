import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'src/store/hooks';
import {getDarkenedColor, getBrightenedColor} from 'src/utils/color-math';
import {Theme} from 'src/utils/themes';
import {
  getSelectedTheme,
} from 'src/store/settingsSlice';
import {
  getNumberOfLayers,
  getSelectedLayerIndex,
  setLayer,
} from 'src/store/keymapSlice';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 15px;
  font-weight: 400;
  top: 10px;
`;
const Label = styled.label`
  font-size: 20px;
  text-transform: uppercase;
  color: var(--color_label-highlighted);
  margin-right: 6px;
`;
const LayerButton = styled.button<{theme: Theme, $selected?: boolean}>`
  outline: none;
  font-variant-numeric: tabular-nums;
  padding: 0 5px 0 0;
  border: none;
  margin-left: 5px;
  background: ${(props) =>
    props.$selected
      ? props.theme.accent.c
      : getBrightenedColor(props.theme.mod.c, 0.7)};
  color: ${(props) =>
    props.$selected
      ? props.theme.mod.c
      : props.theme.accent.c};
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  span {
    display: inline-block;
    height: 100%;
    width: 25px;
    text-align: center;
    border-right: 1px solid transparent;
    background-color: ${(props) =>
      props.$selected ? getDarkenedColor(props.theme.accent.c, 0.9) : props.theme.mod.c};
  }
  &:hover {
    border: none;
    background: ${(props) => props.$selected ? getBrightenedColor(props.theme.accent.c, 0.6) : getBrightenedColor(props.theme.mod.c, 0.6)};
    color: ${(props) =>
      props.$selected ? 'auto' : 'auto'};
    span {
        background-color: ${(props) =>
          props.$selected ? getBrightenedColor(props.theme.accent.c, 0.7) : getBrightenedColor(props.theme.mod.c, 0.7)};
      }
  }
`;

export const LayerControl = () => {
  const dispatch = useDispatch();
  const numberOfLayers = useAppSelector(getNumberOfLayers);
  const selectedLayerIndex = useAppSelector(getSelectedLayerIndex);
  const theme = useAppSelector(getSelectedTheme);
  const layerLabels = [
    "macOS",
    "macOS Fn",
    "Windows",
    "Windows Fn"
  ];

  const Layers = useMemo(
    () =>
      new Array(numberOfLayers)
        .fill(0)
        .map((_, idx) => idx)
        .map((layerIndex) => (
          <LayerButton
            theme={theme}
            key={layerIndex}
            $selected={layerIndex === selectedLayerIndex}
            onClick={() => dispatch(setLayer(layerIndex))}
          >
            <span>{layerIndex}</span> {layerLabels[layerIndex]}
          </LayerButton>
        )),
    [numberOfLayers, selectedLayerIndex],
  );

  return (
    <Container>
      <Label>Layer</Label>
      {Layers}
    </Container>
  );
};
