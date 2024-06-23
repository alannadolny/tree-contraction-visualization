import { useEffect, useState } from 'react';
import { LABEL } from '../utils/consts';

const InfoBar = ({ rake, setIteration }) => {
  const [toRake, setToRake] = useState([]);
  const [toRakeOdd, setToRakeOdd] = useState([]);
  const [toRakeEven, setToRakeEven] = useState([]);
  const [leavesToRakeFromLeftBranches, setLeavesToRakeFromLeftBranches] =
    useState([]);
  const [otherLeavesToRake, setOtherLeavesToRake] = useState([]);

  useEffect(() => {
    calculateRakeInfo();
  }, []);

  const calculateRakeInfo = () => {
    const { even, odd, leavesToRake, left, right } = rake?.getRakeInfo();
    setToRakeEven(even);
    setToRakeOdd(odd);
    setToRake(leavesToRake);
    setLeavesToRakeFromLeftBranches(left);
    setOtherLeavesToRake(right);
  };

  const displayLeaves = (leaves) => {
    return `[${leaves.map((leaf) => leaf.value).join(', ')}]`;
  };

  const rakeTree = () => {
    rake.rake();
    calculateRakeInfo();
    setIteration((iteration) => iteration + 1);
  };

  return (
    <div>
      <p>
        {LABEL.TO_RAKE}
        {displayLeaves(toRake)}
      </p>
      <p>
        {LABEL.A}
        <sub>{LABEL.ODD}</sub> {LABEL.EQUAL_SIGN} {displayLeaves(toRakeOdd)}
      </p>
      <p>
        {LABEL.A}
        <sub>{LABEL.EVEN}</sub> {LABEL.EQUAL_SIGN} {displayLeaves(toRakeEven)}
      </p>
      <p>{LABEL.CONCURENT_RAKES}</p>
      <p>
        {LABEL.A_BRACKET} {displayLeaves(leavesToRakeFromLeftBranches)}
      </p>
      <p>
        {LABEL.B_BRACKET} {displayLeaves(otherLeavesToRake)}
      </p>
      <button disabled={rake.isRakeFinished()} onClick={() => rakeTree()}>
        {LABEL.RAKE}
      </button>
    </div>
  );
};

export default InfoBar;
