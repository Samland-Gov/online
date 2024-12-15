"use client"

import { Button, Content } from '@carbon/react';

export default function Alerts() {
  return (
    <>
      <Content>
        <b>There are no current alerts </b>

        <hr/>

        <section>
          <h2>About emergency alerts</h2>
          <p>Emergency Alerts is a Samland government service that will warn you if there's a danger to life nearby.</p>
          <p>In an emergency, your mobile phone, tablet, television, or radio will receive an alert with advice about how to stay safe.</p>
          <blockquote>
            The government does not need to know your phone number or location to send you an alert. 
          </blockquote>
        </section>
      </Content>
    </>
  );
}
