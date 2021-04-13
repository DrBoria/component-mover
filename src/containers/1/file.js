// TODO: TFR-44:Containers move to container group or do not export
export const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 34.5rem;
  border-radius: 1.5rem;
  padding: 3rem 4rem;
  text-align: center;
  align-self: center;
  margin: 0 auto;
`;

// TODO: TFR-45:Logo make unique name or do not export
export const Logo = styled(DefaultLogo)`
  margin-bottom: 2.5rem;
  max-width: 13.025rem;
`;

// TODO: TFR-45:Button make unique name or do not export
export const Button = styled(DefaultButton)`
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
`;

// TODO: TFR-45:Input make unique name or do not export
export const Input = styled(DefaultInput)`
  :not(:first-child) {
    margin-top: 3rem;
  }
  ${Label} {
    color: ${({ theme }) => addAlpha(theme.colors.navyGreen, 0.8)};
  }
`;
