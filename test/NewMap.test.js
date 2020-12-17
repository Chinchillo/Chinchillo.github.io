import { TestScheduler } from "jest"
import React from "react"
import NewMap from "../src/components/NewMap"
import * as L from 'leaflet';
import 'leaflet.markercluster';
import styled from "styled-components"
import "../css/Map.css"
import renderer from 'react-test-renderer';
describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});