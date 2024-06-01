import { Container, Card, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-5">
      <Container
        className="d-flex justify-content-center">
        <Card
          className="p-5 d-flex flex-column align-items-center border-0 hero-card" style={{
            background: 'transparent', 
          }}>
          {userInfo && (
            <>
              {userInfo.imageUrl && (
                <Image
                  src={userInfo.imageUrl}
                  alt="userProfile"
                  roundedCircle
                  style={{
                    width: "90px",
                    height: "90px",
                    marginBottom: "1rem",
                  }}
                />
              )}
              <h3 className="text-center mb-4">Welcome, {userInfo.name}</h3>
            </>
          )}

          {!userInfo && (
            <div className="py-5" >
              <Container className="d-flex justify-content-center" >
                <Card className="p-5 d-flex flex-column align-items-center hero-card w-75" style={{
            background: 'transparent', 
          }}>
                  <img src="public/2024-bhp-Incentives-Logo.avif" alt="" />
                  <h1 className="text-center mb-4" style={{color:"white"}}>Authentication</h1>
                  <p className="text-center mb-4" style={{color:'white'}}>
                    Authentication app by Hashim
                  </p>
                  <div className="d-flex">
                    <LinkContainer to="/login">
                      <Button variant="danger" className="me-3">
                        Sign In
                      </Button>
                    </LinkContainer>

                    <LinkContainer to="/register">
                      <Button variant="danger" className="my-0" >
                        Sign Up
                      </Button>
                    </LinkContainer>
                  </div>
                </Card>
              </Container>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
